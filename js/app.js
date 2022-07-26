const toggler = document.querySelector('.mobile-nav-toggle');
const menu = document.querySelector('nav');
const form = document.querySelector('form');
const shortenedLinks = document.querySelector('.shortened-links');


toggler.addEventListener('click',() =>  {
    menu.classList.toggle('show-menu');
    toggler.classList.toggle('show-menu')
})

form.addEventListener('submit', async function(e) {
    e.preventDefault();
   const searchLink = form.elements.query.value;
   const config = { params: { url: searchLink } };
   const res = await axios.get(`https://api.shrtco.de/v2/shorten?`, config)
   const data = res.data.result.full_short_link;
   //form.elements.query.value = '';

   shortenedLinks.insertAdjacentHTML("afterbegin", shortLinks(searchLink, data))
})

/*
const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data);
        copy.textContent = 'copied'
    }
copy.addEventListener('click', copyToClipboard) */

const shortLinks = (linkEntered, shortLink) => {
    form.elements.query.value = '';
    return ` <div class="link-card"> 
                <span class="entered-link"> ${linkEntered}</span>
                <div class="shortlink"> 
                <a href="${shortLink}" target="_blank">${shortLink}</a>
                <button class= "btn btn-copy">COPY </button>
                </div>
            </div>`
}

document.addEventListener('click', (e) => {
    if(!e.target.classList.contains('btn-copy')) return 
    let generatedLink = e.target.parentNode.querySelector('.shortlink a');

    navigator.clipboard.writeText(generatedLink.href);

    e.target.classList.add('show');
    e.target.textContent = 'Copied';

    setTimeout(() => {
        e.target.classList.remove('show')
        e.target.textContent = 'Copy'
    }, 1500);
})
