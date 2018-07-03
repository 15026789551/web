let header=document.getElementById('header');
let btnList=header.getElementsByTagName('a');
let shopList=document.getElementById('shopList');
let data=null;


let xhr=new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange=function () {
    if(xhr.status==200&&xhr.readyState==4){
        data=JSON.parse(xhr.responseText)
    }
};
xhr.send(null);
console.log(data);

function bindHTML() {
    var str='';
    data.forEach(item=>{
        str+=`<li>
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度${item.hot}</p>
                <del>$9999</del>
                <span>¥${item.price}</span>
                <p class="tim">上架时间：${item.time}</p>
            </li>`
    })
    shopList.innerHTML=str;
}
bindHTML();

for(let i=0;i<btnList.length;i++){
    btnList[i].flg=-1;
    btnList[i].onclick=function () {
        let value=this.getAttribute('attrName');
        this.flg*=-1;
        sortAll.call(this,value);
        arrowColor.call(this);
        clearArrow.call(this)
    }
}

function sortAll(value) {
    data.sort((a,b)=>{
        return (value=='time'?new Date(a[value])-new Date(b[value]):a[value]-b[value])*this.flg
    })
    bindHTML()
}

function arrowColor() {
    let up=this.children[0];
    let down=this.children[1];
    if(this.flg>0){
        up.classList.add('bg');
        down.classList.remove('bg')
    }else{
        up.classList.remove('bg');
        down.classList.add('bg')
    }
}
function  clearArrow() {
    for(let i=0;i<btnList.length;i++){
        if(btnList[i]!=this){
            btnList[i].children[0].classList.remove('bg');
            btnList[i].children[1].classList.remove('bg');
            btnList[i].flg=-1
        }
    }
}