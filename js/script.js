/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentList = document.getElementsByClassName('student-item cf'); //grabbing the 54 students from the html
const studentsPerPage = 10; 

const showPage = (list, page) => {           //function for how many students I want shown on a page
   let indexStart = (page * studentsPerPage) - studentsPerPage;
   let indexEnd = page * studentsPerPage;

   for (let i = 0; i < list.length; i += 1) {
      if (i >= indexStart && i < indexEnd) {       // setting the student list limit per page
         studentList[i].style.display = 'block';
      } else {
         studentList[i].style.display = 'none';
      }
   }
}
showPage(studentList, 1);

const appendPageLinks = (list) => {
  const div = document.createElement('div');           // I'll be creating the links here in lines 24-26
  const page = document.querySelector('.page');
  let ul = document.createElement('ul');
  let pageNumber = Math.ceil(list.length / studentsPerPage);

  page.appendChild(div);     
  div.appendChild(ul);
  div.className = 'pagination'; 

  for (j = 1; j <= pageNumber; j ++) {         // for every page number, a <li> & <a> tag is added.
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', "#");        
    ul.appendChild(li);
    li.appendChild(a);
    a.innerHTML = j;                          // this dynamically puts the links on the page
  }   
      
  ul.addEventListener('click', (event) => {    
    let clickedLink = event.target;
    let linkNumber = event.target.textContent;
    showPage(studentList, linkNumber);                 // to show a different list of students each page

    let everyLink = document.querySelectorAll('a');   
    for (let k = 0; k < everyLink.length; k += 1) {
        everyLink[k].className = 'none';               // removing active class name from unclicked links
    }
    clickedLink.className = 'active';
    console.log(clickedLink);
  });
} 

const div = document.createElement('div');           
const input = document.createElement('input');
const searchButton = document.createElement ('button');    
const pageHeader = document.querySelector('.page-header');

//appending the search button and input to the page
pageHeader.appendChild(div);                                 
div.appendChild(searchButton);                             
div.appendChild(input);   

div.className = "student-search"; 
searchButton.textContent = `Search`;                               
input.setAttribute ('placeholder', "Search for students");

//creating the no results content
const noResults = document.createElement ('p');                                       
noResults.textContent = ''; 
div.appendChild(noResults);  

let searchResults = [];

//search functionality
const searchInput = () => {
   searchResults = [];
   for (let i = 0; i < studentList.length; i++) {                                     
    if (studentList[i].textContent.toLowerCase().includes(input.value.toLowerCase())) {                        
      studentList[i].style.display = "block";                 
      searchResults.push(studentList[i]);                   
    } else {
      studentList[i].style.display = "none";              
    }
  }
}

//adding 'click' eventListener
searchButton.addEventListener('click', () => {
  searchInput();
  const page = document.querySelector('.page');
  const pagination = document.querySelector('.pagination');
  page.removeChild(pagination);
  if (searchResults.length === 0) {
   noResults.textContent = `No results have been found`;
  }else {
   noResults.textContent = '';
  }
  showPage(searchResults);                                 
  appendPageLinks(searchResults);                          
}) ;

input.addEventListener('keyup', () => {
  searchInput();
  const page = document.querySelector('.page');
  const pagination = document.querySelector('.pagination');
  page.removeChild(pagination);
  if (searchResults.length === 0) {
    noResults.textContent = `No results have been found`;       
  } else {
   noResults.textContent = '';
  }
  appendPageLinks(searchResults);
});

appendPageLinks(studentList);  