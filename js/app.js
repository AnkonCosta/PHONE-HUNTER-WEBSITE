const loadData = (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data))
};

const displayData = (phones) => {
    const displayPhoneElement = document.getElementById('phone-container');
    displayPhoneElement.innerHTML = ``;
    // display 30 phones only 
    phones = phones.slice(0, 27);
    const noPhone = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');

    }

    console.log(phones);
    for (const phone of phones) {
        // console.log(phone);


        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div onclick="showDetails('${phone.slug}')" class="card h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <img  src="${phone.image}" class="card-img-top p-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold text-success">${phone.phone_name}</h5>
                    <p class="card-text ">This is a longer card with supporting text below as a natural lead-in
                     to additional content. This content is a little bit longer.</ p>
                </div>   

        </div>`;
        displayPhoneElement.appendChild(phoneDiv);
    }
    loader(false);
};

// const searchPhone = () => {
//     const searchPhoneFieldElement = document.getElementById('search-field');
//     const searchFieldValue = searchPhoneFieldElement.value;
//     loadData(searchFieldValue);
// }

document.getElementById('btn-search').addEventListener('click', function () {
    loader(true);
    const searchPhoneFieldElement = document.getElementById('search-field');
    const searchFieldValue = searchPhoneFieldElement.value;
    loadData(searchFieldValue);
});



const showDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
};

const displayDetails = (phone) => {
    console.log(phone);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const modalImage = document.getElementById('image');
    modalImage.src = phone.image;
    const modalPara = document.getElementById('para');
    const modalPara2 = document.getElementById('para2');
    const modalPara3 = document.getElementById('para3');
    modalPara.innerText = phone.mainFeatures.storage;
    modalPara2.innerText = phone.mainFeatures.displaySize;
    modalPara3.innerText = `Brand: ${phone.brand}`;



};

const loader = (isLoading) => {
    const loaderElement = document.getElementById('loader');
    if (isLoading === true) {
        loaderElement.classList.remove('d-none');
    }
    else {
        loaderElement.classList.add('d-none');

    }
}










// loadData('');
