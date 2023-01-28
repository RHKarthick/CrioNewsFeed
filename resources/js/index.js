const getId = ()=> Math.random().toString(36).substr(2,9);

const getAccordionItem = (title,id) =>{
    return `
    <div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button class="btn btn-link" aria-expanded="true" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-controls="collapse${id}">
      ${title}
      </button>
    </h2>
    <div id="collapse${id}" class="collapse" data-bs-parent="accordionId" aria-labelledby="heading${id}">
      </div>
    </div>
    `;
};

const getCarouselOuter = (id, innerId) =>{
    return `
    <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
     <div class="carousel-inner" id="${innerId}"></div>
     <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
    </button>
  </div>`;
};

const getCarouselItem = (id, active) =>{
    return `<div class ="carousel-item ${active ? "active" : ""}" id="${id}"></div>`;
};

const getCard = (item) =>{
    return `
    <div class="card d-block">
        <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${item["title"]}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
        <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
        <p class="card-text">${item["description"]}</p>
        <a href="${item["link"]}" class="stretched-link" target="_blank"></a>
        </div>
    </div>`;
};


const addContent = async ()=>{
    magazines.forEach(async (magazineUrl,magazineIdx) => {
        const response=await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(magazineUrl)}`);
        let data= await response.json();
        //console.log("data",data);
        
        //create accordion item
        let accordionItemId = getId();
        const accordionItem = getAccordionItem(data["feed"]["title"], accordionItemId);
      //  console.log("accordionItem",accordionItem)
        document.getElementById("accordionId").innerHTML += accordionItem;

        // by default expand only the first accordion
        if(magazineIdx === 0){
            document.getElementById(`collapse${accordionItemId}`).classList.add("show")
        }

        let carouselId = getId();
        let carouselInnerId = getId();
        let carousel = getCarouselOuter(carouselId, carouselInnerId);
        document.getElementById(`collapse${accordionItemId}`).innerHTML = carousel;

        data["items"].forEach((item,itemIdx) =>{
            //create carousel item & add it to carouselInner
            let carouselItemId = getId();  
            const carouselItem = getCarouselItem(carouselItemId, itemIdx === 0);
            document.getElementById(carouselInnerId).innerHTML += carouselItem;

            //create card 
            let card = getCard(item);
            document.getElementById(carouselItemId).innerHTML = card;
        })

     });
}

addContent();