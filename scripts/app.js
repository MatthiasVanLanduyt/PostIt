'use strict';

const app = {
  postIts : [],
  newPostIt : function(title, content) {
    let postIt = {
      uid : util.uuid(),
      title: title,
      done: false,
      content : content,
      color : util.generateRandomColor(),
      posX : util.generateRandomNumber(10,1600),
      posY: util.generateRandomNumber(10,900),
      rotate: util.generateRandomNumber(-30,30),
      width: 100,
      height: 75
    };
    this.postIts.push(postIt);
    view.render();
  },
  changePostItContent : function(position, content) {
    let postIt = this.postIts[position];
    postIt.content = content;
    view.render();
  },
  deletePostIt : function(uid) {
    let position = this.postIts.findIndex(postIt => postIt.uid === uid);
    console.log(position);
    if (position > -1) {
      this.postIts.splice(position, 1);
    }
    view.render();
  },
  toggleDone : function (uid) {
    let position = this.postIts.findIndex(postIt => postIt.uid === uid);
    let postIt = this.postIts[position];
    if (position > -1) {
      postIt.done = !postIt.done;
    }
    view.render();
  }
}

const init = {
  //This code is used to generate some basic data in order to lose less time testing.
  setUp : function () {
    app.newPostIt('Title1','This is some random text');
    app.newPostIt('Title1','Another app: This is some random text');
    app.newPostIt('Title1','Another postIt: This is some random text');
  }
}

const util = {
  // A collection of helper functions which are used throughout the application
  generateRandomNumber : function(min,max) {
      let number = Math.floor( (max - min + 1) * Math.random() + min );
      return number;
    },
  generateRandomColor : function () {
    //Generate Random Number is a function which creates a number.
    //A color is created by combining three random integers between 0 and 255.
    const generateRandomNumber = this.generateRandomNumber;
    let color = 'rgb(' + generateRandomNumber(0,255) + ',' + generateRandomNumber(0,255) + ',' + generateRandomNumber(0,255) +')'
    return color;
  },
  uuid: function () {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }
}

const view = {
  render : function () {
    //Clear everything
    this.clear();
    //Set canvas
    let canvas = document.querySelector('section.canvas');
    let postIts = app.postIts;
    //Loop through elements in PostIts
    for (let i=0; i < postIts.length; i++) {
      //Destructure postIt
      let postIt = postIts[i];
      let {uid, title, done, content, color, posX, posY, rotate, width, height} = postIt;
      //Create box
      let box = document.createElement('div');
      box.className = 'postIt';
      box.style.backgroundColor = color;
      // canvas.appendChild(box);
      box.style.left = posX + 'px';
      box.style.top = posY + 'px';
      box.style.transform = 'rotate(' + rotate + 'deg)';
      box.id = uid;
      if (done === true) {
        box.classList.add('done');
      }
      //Add title to items (title contains spans for done/not done and delete)
      let titleElement = document.createElement('h4');
      titleElement.setAttribute('class', 'postIt-title');
      //Add done/undone button
      let spanDone = document.createElement('span');
      spanDone.setAttribute('class', 'postIt-done');
      spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
      //Add title
      let spanTitle = document.createElement('span');
      spanTitle.textContent = title;
      //Add delete button to item
      let spanDelete = document.createElement('span');
      spanDelete.setAttribute('class', 'postIt-delete');
      spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";
      //Append them all together
      titleElement.append(spanDone);
      titleElement.append(spanTitle);
      titleElement.append(spanDelete);
      //Add text to box
      let text = document.createElement('p');
      text.textContent = content;
      text.className = 'postIt-text';
      //Put it all together
      box.appendChild(titleElement);
      box.appendChild(text);
      canvas.appendChild(box);
      this.setUpPostItEventListeners(box);
    }
  },
  clear : function () {
    let canvas = document.querySelector('.canvas');
    canvas.innerHTML = '';
  },
  setUpPostItEventListeners: function (element) {
    //Title and content needs eventlistener on clicked
    //SpanDone and SpanDelete need eventlistener on clicked
    const spanDeleteClick = function (uid) {
      app.deletePostIt(uid);
    };
    const spanDoneClick = function (uid) {
      app.toggleDone (uid);
    };
    const spanTitleClick = function (target) {
      target.focus();
    };
    const contentClick = function (target) {
      console.log('targetClick');
    };

    element.addEventListener('click', function (event) {
      let target = event.target;
      let targetClass = target.className;
      let targetUid = element.id;

      switch (targetClass) {
        case 'postIt-delete' :
          spanDeleteClick(targetUid);
          break;
        case 'postIt-done' :
          spanDoneClick(targetUid);
          break;
        case 'postIt-title' :
          spanTitleClick(target);
          break;
        default :
          console.log('Clicked somewhere else');
      }
    });
  }
}

//Start program

init.setUp() ;
