window.onload = function(e) {

    // Here, we remove the logo and instead put it outside of the home button to take it to codethechange.stanford.edu.
    logoButton = document.getElementsByClassName("logo")[0]

    logoParent = logoButton.parentNode
    logoParent.removeChild(logoButton)
    
    newLogo = document.createElement("a")
    newLogo.href= "https://codethechange.stanford.edu"
    newLogo.innerHTML = '<img src="_static/ctcLogo.png" class="logo" alt="Logo">'
    logoParent.appendChild(newLogo)
}
