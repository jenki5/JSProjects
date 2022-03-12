document.getElementById('button').addEventListener('click', loadData);

function loadData(){
    const XHR = new XMLHttpRequest();

    XHR.open('GET', 'data.txt', true);

    XHR.onload = function(){
        if(this.status === 200){
            console.log(this.responseText);
        }
    }

    XHR.send();

}