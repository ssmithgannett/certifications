jQuery(document).ready(() => {

  //create certTitle variable to pass to form
  const urlString = window.location.href;
  const urlSplit = urlString.split('/')
  console.log(urlSplit)
  const urlCertVal = urlSplit[3];
  const urlCertValSplit = urlCertVal.split('-');
  const certTitle = urlCertValSplit[0];


  //event listener to receive form submission from iframe
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent,function(e) {
      var key = e.message ? "message" : "data";
      var data = e[key];
      //run function//
      if (data == 'fs-form-submit') {
        setTimeout(() => {closeMe()}, 1000);
        localStorage.setItem(certTitle, 'yes')
      }
  },false);

  //close function
  const closeMe = () => {
    jQuery('#cert-pop').fadeOut(1000)
    certPage.css('overflow', 'scroll')
  }

  //remove default thumbnail from apge
  jQuery('.post-thumbnail').remove();

  //is this a certificate page?
  let certPage = jQuery('.page-with-query')
  if (certPage.length) {
    jQuery('.entry-content').css('width', '100%')
    jQuery('hr.wp-block-separator').remove()
    jQuery('.static-page-content').css('max-width','100%')
    //check if it's user's first time or they havent entered info
    var ls = localStorage.getItem(certTitle);
    console.log(certTitle)
    console.log(ls)
    if (ls == null || ls != 'yes') {
        certPage.append(`<div class="devnotes">(dev notes) First visit, or they havent used the form yet</div>`);
        localStorage.setItem(certTitle, 'first')
    
      //create form url with url query params
      const formURL = `https://gannett-nxuao.formstack.com/forms/certification_test?certification=${certTitle}`
      //stop page scroll
      certPage.css('overflow','hidden')
      //build and show popup
      certPage.append(`
    
      <div id="cert-pop">
        <div id="cert-pop-card">
          <p>Hey there! Sign up to receive the certificate you've earned, occasional invites to related career development opportunities, and invites to join a community of practice comprising other professionals around the company with similar interests and pursuits.</p>
          <div id="form">
          <iframe width="640px" height="600px" src="${formURL}" frameborder= "0" marginwidth= "0" marginheight= "0" style="border: none; max-width:100%; max-height:100vh; overflow:hidden;" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
          </div>
        </div>
      </div>
      `)
      $("#cert-pop")
      .css("display", "flex")
      .hide()
      .fadeIn();

      setTimeout(() => {jQuery('#cert-pop-card').css({'opacity': 1,'margin-top': '0px'})}, 1000);
    }// ls == null || 1  
    else {
      certPage.append(`<div class="devnotes">(dev notes) Returning user <button onClick="localStorage.setItem('wordpress', '')">Reset</button></div>`);
    }
  }// if certification page
  /*else {
    //do nothing
   
  }*/
});//page load

