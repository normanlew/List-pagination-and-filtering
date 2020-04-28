// Norman Lew

/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   

/*  This project demonstrates the use of list filetering and pagination.  There
  is initially a list of students that are displayed on a webpage.  In this project, 
  I created a search bar to filter the list of students shown.  I also used pagination
  to limit the number of students shown per page, as well as created a way to go to 
  individual pages via links at the bottom of each page.
*/


// Constants to hold the student list and the number of students per page.
const studentList = document.querySelector('ul').children;
const numStudentsPerPage = 10;

// This function creates a new element of 'type' 
// and sets the 'attribute' of that element to 'text'
function createNewElement(type, attribute, text) {
   const element = document.createElement(type);
   element[attribute] = text;
   return element;

}


// This function hides all students in the list except for the ten
// that you want to show.  The list parameter is the list of students.
// The page parameter is the page number that you want to show.  
// Students are displayed the following way:  the first ten students on the list
// are shown on the first page, the next ten students on the list are shown on the
// second page, and so forth.
function showPage (list, page) {
   let startIndex = (page * numStudentsPerPage) - numStudentsPerPage;
   let endIndex = Math.min(page * numStudentsPerPage, list.length);

   // First, turn off display for each student
   for (let i = 0; i < studentList.length; i++) {
      studentList[i].style.display = 'none';
   }

   // Then, only display the students that should be displayed for this page
   for (let i = startIndex; i < endIndex && i >= 0; i++) {
      list[i].style.display = '';
   }
}

// This function generates and appends the pagination buttons at the 
// bottom of the webpage.  It also adds functionality to the pagination buttons.
// When a pagination button is clicked, only those students that should be
// displayed on that particular page are displayed.
function appendPageLinks(list) {
   const topLevelDiv = document.getElementsByClassName('page')[0];
   const lastChild = topLevelDiv.lastElementChild;
   
   if (lastChild.className === 'pagination') {
      topLevelDiv.removeChild(lastChild);
   }

   // This div contains the pagination buttons
   const divPaginationLinks = document.createElement('div');

   // This is the number of pages that should be shown
   const totalPages = Math.ceil(list.length / numStudentsPerPage);

   if (totalPages > 0) {
      const ul = document.createElement('ul');
      divPaginationLinks.className = 'pagination';

      // This loop creates each pagination button, one for each page
      for (let i = 1; i <= totalPages; i++) {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.setAttribute('href', '#');
         a.textContent = i;

         // When a pagination button is clicked, the webpage will show
         // only the clicked button/page as highlighted.  It also calls the
         // showPage function to display only the students that should be
         // shown on this page.
         a.addEventListener('click', (e) => {
            const allActiveLinks = document.getElementsByClassName('active');
            for (let j = 0; j < allActiveLinks.length; j++) {
               allActiveLinks[j].className = '';
            }
            showPage(list, parseInt(e.target.textContent));
            e.target.className = 'active';
         });

         li.appendChild(a);
         ul.appendChild(li);
      }

         // When the webpage is first loaded, the 1st pagination link/button is 
         // highlighted, with the first ten (or less than ten if there are
         // less than ten) students shown on the first page.
         const li = ul.firstElementChild;
         const a = li.firstElementChild;
         a.className = 'active';
      
         divPaginationLinks.appendChild(ul);
         topLevelDiv.appendChild(divPaginationLinks);
         showPage(list, 1);
   }
   else {
      showPage(list, 0);
   }
}

// This function creates the search bar to filter the results
function createSearchBar() {
   const divPageHead = document.getElementsByClassName('page-header')[0];
   const divStudentSearch = createNewElement('div', 'className', 'student-search');
   const searchInput = createNewElement('input', 'placeholder', 'Search for students...');
   const searchButton = createNewElement('button', 'textContent', 'Search');

   divStudentSearch.appendChild(searchInput);
   divStudentSearch.appendChild(searchButton);
   divPageHead.appendChild(divStudentSearch);

   const h3 = document.createElement('h3');
   h3.innerHTML = "<br><br><br>There are no students with names matching that search";

   // When the search button is clicked, only names containing the contents of the
   // input box are displayed.  If there are no matching names, a message to the
   // user is displayed saying there were no matches
   searchButton.addEventListener('click', (e) => {
      const text = searchInput.value;
      const foundStudents = [];
      for (let i = 0; i < studentList.length; i++) {
         const div = studentList[i].firstElementChild;
         const image = div.firstElementChild;
         const h3 = image.nextElementSibling;
         if (h3.textContent.includes(text)) {
            foundStudents.push(studentList[i]);
         }
      }
      if (foundStudents.length <= 0) {
         if (!divPageHead.contains(h3)) {
            divPageHead.appendChild(h3);
         }
         
      }
      else {
         if (divPageHead.contains(h3)) {
            divPageHead.removeChild(h3);
         }
      }
      appendPageLinks(foundStudents);
   });
}

createSearchBar();
appendPageLinks(studentList);

