/*
a const tdQuantity-hez csinálunk két button, az egyikkel növelni a másikkal csökkenteni lehet majd a quantity-t 
minusBtn legyen elöbb a sorrendiség miatt 
*/

const tdQuantity = document.querySelector("td");
tdQuantity.innerText = product.quantity;
const minusBtn = document.querySelector("button");   /*X*/
minusBtn.innerText = "-";                            /*X*/
const plusBtn = document.createElement("button");    /*X*/
plusBtn.innerText = "+";                             /*X*/
tdQuantity.appendChild(minusBtn);                    /*X*/
tdQuantity.innerText = product.quantity;
tdQuantity.appendChild(plusBtn);                     /*X*/

/*
Most megjelent a Quantity-nál egy minusz és plusz button, de még elég hülyén néz ki 3-+
a számnak kellene középen lennie -> -3+

a megoldás ez, hogy a lehoztuk pár sorral fejjebbről a tdQuantity.innerText-jét és beraktuk a két appendChild-olás közé

Quantity.appendChild(minusBtn);                    
tdQuantity.innerText = product.quantity;
tdQuantity.appendChild(plusBtn);

-> de ez se jó, mert, ha megváltozik a quantity akkor kitörli az elötte lévő tdQuantity.appendChild(minusBtn);   
megoldás, hogy csinálunk egy div-et, de az 100%-ak széles és jobb lenne, ha itt nem egy div-ünk, hanem egy span lenne 
de inkább marad a div és a tdQuantity-nek megadunk egy class-t 
*/

const tdQuantity = document.createElement("td");
tdQuantity.classList.add("quantity-flex");
const minusBtn = document.createElement("button");
minusBtn.innerText = "-";
const plusBtn = document.createElement("button");
plusBtn.innerText = "+";
const divQuantity = document.createElement("div");    /*X*/
divQuantity.innerText = product.quantity;             /*X*/


tdQuantity.appendChild(minusBtn);                     /*X*/
tdQuantity.appendChild(divQuantity);                  /*X*/
tdQuantity.appendChild(plusBtn);                      /*X*/

/*
Megnyitottuk a böngészőben és a Quantity alatt van két gomd, az egyik + a másik - és középen pedig (product.quantity),
mennyit szeretnénk belőle vásaárolni 
*/
/*Ugyanitt legalul csinálunk a showCart() minus/plusBtn-nek eventListenereket*/

plusBtn.addEventListener("click", () => {
    const newQuantity = product.quantity + 1; //azért tettük ezt egy változóba, mert több helyen is fel fogjuk használni (quantity, subSum)
    divQuantity.innertext = newQuantity;
    /*tudnunk kell a jelenlegi quantity-t és majd a plusBtn-nel növelni eggyel 
    nemcsak a kiírt számot kell növelnünk eggyel, hanem a cart-ban is meg kell keresni az adott terméket
    ezért a remove(id) alatt csinálnuk egy olyat, hogy changeQunatity(), amivel tudjuk növeli és csökkenteni 
    a termékek számát a cart.ban -> changeQuantity, amit majd meghívunk itt*/
    this.changeQuantity(product.productID, 1)//1 mert mindig csak eggyel tudjuk növelni

    tdSubSum.innerText = (newQuantity * product.price) + "$";


});
minusBtn.addEventListener("click", () => {
    const newQuantity = product.quantity - 1; //ugyanaz mint a plus-nál csak csükkentjük a quantity-t eggyel
    divQuantity.innertext = newQuantity;
    this.changeQuantity(product.productID, -1);
    /*itt még két problémánk van
    1. lemehet minuszba is 
    2. ha lemegy nullára, akkor ki kell törölni az egész terméket */
    tdSubSum.innerText = (newQuantity * product.price) + "$";
});

/*
bekérünk két paramétert, egy id-t ami alapján megkeressük a terméket és egy quantity-t, amit majd hozzáadunk, kivonunk 
az index-szel amit készítettünk arra, hogy id alapján megtalálja a terméket 
*/
changeQuantity(id, quantity) {
    const index = this.cart.findIndex((p) => p.productID === id); //chatgpt.js-ben index elmagyarázása mit csinál 
    this.cart[index].quantity += quantity;
    //a this.cart indexén lévő quantityhez hozzáadjuk a mi quantity-nket 
    localStorage.setItem("cart", JSON.stringify(this.cart)); // ezek után a local storage-ben is módosítani szükséges

    if (this.cart[index].quantity === 0) {//ha quantity a módosítás után 0
        this.remove(id); //meghívjuk a this.remove-ot és átadjuk neki az id-t, itt nem kell localStorage-ben módosítani 
    } else               // mert azt már megcsináltuk a remove függvényben is, amit itt meghívtunk 
        localStorage.setItem("cart", JSON.stringify(this.cart)); // ha viszont nem null és nem hívjuk meg a remove-ot
    //a local storage-ben is módosítani szükséges
}
/*
Tovabbmegyünk és megcsináljuk a subSumit, (ugyanitt a plus/minusBtn eventListenerében, hiszen a subSum is attol fog függeni)
 hogy amikor növeljük a quantity-t termékeknél akkor növeljük is annyival a subSum-ot 
utána visszatérünk, hogy a minusBtn eventListener-ében (1.lemehet minuszba is, 2.ha lemegyünk nullára, töröljük a terméket)
*/

/*
plus/minusBtn eventListenerjében csináltuk a subSum-ta a plus-ban a newquantity hozzáad eggyet, a minus-ban levon
és ezt szorozzuk be a product.price-val 
tdSubSum.innerText = (newQuantity * product.price) + "$";
*/

/*
törölni szeretnénk a terméket ha 0 lesz a quantitynél a szám
a törlésre már csináltunk egy metódust, amit itt fel tudnánk használni -> remove(id)
a minusBtn eventListener alatt csinálunk egy deleteBtn eventListenert (de az csak, arra a törlésre vonatkozik, ha megnyomjuk a gombot)
*/

deleteBtn.addEventListener("click", () => {
    this.remove(product.productID);
    /*meghívjuk a remove-ot és megadjuk neki azt az id-t amit törölni szeretnénk (product objektumon belül a productId-t) 
    és ilyenkor le kell törölni az egész tr-t annak a terméknek
    most, ha megnyomjuk a törlés gombot és újratöltjük az oldalt, akkor a termék(tr) törlödik de ez nem valós időben történik */
    tr.remove()
    /*
    tr.remove() ->
    Megoldja a showCart(for of) ciklus a dolgot, mert a ciklusban az adott tr-t érjük el 
    */
});

/*most jön az, hogy amikor nullára ér a quantity , akkor törlödjön -> ezt a changeQuantity-ban fogjuk csinálni elöször, 
de ezt meg kell oldani a minusBtn eventListenerjében is ->*/

minutBtn.addEventListener("click", () => {
    const newQuantity = product.quantity - 1;
    divQuantity.innerText = newQuantity;
    this.changeQuantity(product.productID, -1);

    tdSubSum.innerText = (newQuantity * product.price) + "$";

    if (newQuantity === 0) //ha a quantity-nk nulla akkor törlödjön ki az egész sor a cart-ból, mert ezt már a changeQuantity-val 
        tr.remove(); // megcsináltuk a local storage-ra, de itt most megcsináljuk, hogy a böngészőből is eltünjön az a sor, ahol a quantity 0
});
/**************************************************************************************************************************************/
/*
Összehozni az összesítést alulra és minden módosítás után megváltoztatni a szükséges módon
deleteBtn után csinélunk egy sum függvényt, ami azt csinálja, hogy végigmegy a cart-on (for) és csinál egy tr-t amiben összesiti a dolgokat
meg kell nézni, hogy a tr-t hányféle osszuk fel, mert pl. Category, Brand, Title, Price-t nem kell összegezni->
kell a quantity, subSum-ot és összesiteni és a végén kell egy kosár ürítése gomb
*/
showSum() {
    for (const product of this.cart) {
        const tr = document.createElement("tr");
        //utána csinálunk egy td-t ami négy oszlopot vesz fel -> colspan nevű tulajdonság az 4 lesz 
        const tdSum = document.createElement("td");
        tdSum.colSpan = 4;

        const tdQuatity = document.createElement("td");
    }
}
/*máshogy csináljuk ->*/

showSum() {//átnevezzük showSum-ra, sum()-ról 
    //const sum = this.cart.reduce((total, p) => total + p.price, 0);
    //const quantity = this.cart.reduce((total, p) => total + p.quantity, 0);

    /*
    nulla kell a végére, mert mindig az első elem total-nak az eleje, viszont itt az első elem az egy objektum,
    mert a cart-ban objektumok vannak, ezért az objektumokhoz adogatja hozzá a dolgokat és lett Object3253, ha nem írunk 0-át
    */


    /*reduce() -> összeadja vagy összeszorozza a dolgokat*/

    const tr = document.createElement("tr");
    //utána csinálunk egy td-t ami négy oszlopot vesz fel -> colspan nevű tulajdonság az 4 lesz 
    const tdSum = document.createElement("td");
    tdSum.colSpan = 4;
    tdSum.innerHTML = '<h4>Összesen</h4>';

    const tdQuatity = document.createElement("td"); /*változtatás lejjebb this.*/
    tdQuantity.innerText = quantity;                /*változtatás lejjebb this.*/

    const tdAmount = document.createElement("td");  /*változtatás lejjebb this.*/
    tdAmount.colSpan = 2;                           /*változtatás lejjebb this.*/
    tdAmount.innerText = (sum * quantity) + "$";    /*változtatás lejjebb this.*/

    const tdDelete = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Kosár ürítése";

    tdDelete.appendChild(deleteBtn);

    tr.appendChild(tdSum);
    tr.appendChild(tdQuantity);  /*változtatás lejjebb this.*/
    tr.appendChild(tdAmount);    /*változtatás lejjebb this.*/
    tr.appendChild(tdDelete);

    this.cartBody.appendChild(tr);

};

/*
Ezt be kell tenni, ugyhogy mindig ez legyen az utolsó sor és ez azért problematikus, mert mindig berakosgatjuk a végére, amikor 
frissitve van, akkor egyre több és több ilyen összegzés fog megjelenni
showCart-nak a végére -> this.sum(); hogy meghívjuk ls még meghívjuk a plusbBtn.eventListenerben is!!!!!!
*/

/*
Meghívtuk a sum()-ot a plusBtn.eventListenerében, ha rákattintunk, hogy akkor növeli is az amount-ot meg quantity-t,
csak az a baj, hogy minden kattintással csinál egy új összegzősort, az a megoldás, hogy az utolsó sorban való értékeket 
frissitjük -> egyetlen egyszer legeneráljuk ezt a dolgot sum()-ot, ami most meg van hívva két helyen, a plusBtn.eventListenerében és a 
showCart legvégén -> kitöröljük a meghívásunkat a plusBtn.eventlisteneréből ->
tdQuantity-t és a tdAmountot lementjük globálisan és csak annak az értékét módosítjuk, mert másnak az értéke nem módosul 
->
legfelül a class Cartban csinálunk egy tdQuantity-t és tdAmountot, sumbol meg kitöröljük, hogy átírjuk a cosnt tdQuanity/Amount, igy ->
this elé mindegyiknek 
*/

class Cart {
    cart;
    cartBody;
    tdQuantity;  /*X*/
    tdAmount;    /*X*/
}

this.tdQuatity = document.createElement("td");
this.tdQuantity.innerText = quantity;

this.tdAmount = document.createElement("td");
this.tdAmount.colSpan = 2;
this.tdAmount.innerText = (sum * quantity) + "$";

/*
a végén a appendChildolásnál is kell a this
*/

tr.appendChild(this.tdQuantity);
tr.appendChild(this.tdAmount);

/*
átneveztük a sum()-ot showSum()-ra
és csinálunk egy sum()-ot a showSum felé -> visszaadjuk benne a sum-ot és a quantity-t egy objektumban
*/

sum() {
const sum = this.cart.reduce((total, p) => total + p.price, 0);
const quantity = this.cart.reduce((total, p) => total + p.quantity, 0);

return {
    sum:sum,
    quantity:quantity
}
}

/*
Ezután a plusBtn-be módosítunk 
*/

plusBtn.addEventListener("click", () => {
    const newQuantity = product.quantity + 1; //azért tettük ezt egy változóba, mert több helyen is fel fogjuk használni (quantity, subSum)
    divQuantity.innertext = newQuantity;
    /*tudnunk kell a jelenlegi quantity-t és majd a plusBtn-nel növelni eggyel 
    nemcsak a kiírt számot kell növelnünk eggyel, hanem a cart-ban is meg kell keresni az adott terméket
    ezért a remove(id) alatt csinálnuk egy olyat, hogy changeQunatity(), amivel tudjuk növeli és csökkenteni 
    a termékek számát a cart.ban -> changeQuantity, amit majd meghívunk itt*/
    this.changeQuantity(product.productID, 1)//1 mert mindig csak eggyel tudjuk növelni

    tdSubSum.innerText = (newQuantity * product.price) + "$";

    const sumValues = this.sum() /*X  -> meghívjuk itt a sum()-ot, amit most készítettünk*/
    this.tdAmount.innerText = (sumValues.quantity * sumValues.sum) + "$"; /*X*/ 
    this.tdQuantity.innerText = sumValues.quantity; /*X*/
})

/*Ahhoz, hogy visszafele is müködjön -> minusBtn-nél is ugyanez*/ 

minusBtn.addEventListener("click", () => {
    const newQuantity = product.quantity - 1; //ugyanaz mint a plus-nál csak csükkentjük a quantity-t eggyel
    divQuantity.innertext = newQuantity;
    this.changeQuantity(product.productID, -1);
    /*itt még két problémánk van
    1. lemehet minuszba is 
    2. ha lemegy nullára, akkor ki kell törölni az egész terméket */
    tdSubSum.innerText = (newQuantity * product.price) + "$";

    if (newQuantity === 0) //ha a quantity-nk nulla akkor törlödjön ki az egész sor a cart-ból, mert ezt már a changeQuantity-val 
        tr.remove(); // megcsináltuk a local storage-ra, de itt most megcsináljuk, hogy a böngészőből is eltünjön az a sor, ahol a quantity 0

    const sumValues = this.sum() /*X*/
    this.tdAmount.innerText = (sumValues.quantity * sumValues.sum) + "$"; /*X*/ 
    this.tdQuantity.innerText = sumValues.quantity; /*X*/
});
/*****************************************************************************************************************/

/* 
Minden szépen mükdöik, csak még, annyi, hogy a plus meg a minusBtn nagyon hasonló, ezért csinálunk nekik egy function-t 
hogy rövidebb legyen a beljsejük és majd, csak azt a functiont kelljen majd meghívni mindegyikben

/*                 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!FONTOS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                    */
*/
plusMinus(id, newQuantity, price, divQuantity) {
    const newQuantity = product.quantity + 1;
    divQuantity.innertext = newQuantity;
    this.changeQuantity(id, 1)

    tdSubSum.innerText = (newQuantity * price) + "$";

    const sumValues = this.sum()
    this.tdAmount.innerText = (sumValues.quantity * sumValues.sum) + "$"; 
    this.tdQuantity.innerText = sumValues.quantity;
}

//-> megadtuk a plusMinusnak milyen paramétereket vár és csak lemásoltuk a plusBtn tartalmát (lent) és módisíásokat fogunk rajta csinálni (fent)

plusMinus(id, newQuantity, price, divQuantity) {
    divQuantity.innertext = newQuantity; 
    this.changeQuantity(id, 1) /*X*/

    tdSubSum.innerText = (newQuantity * product.price) + "$"; /*X*/

    const sumValues = this.sum()
    this.tdAmount.innerText = (sumValues.quantity * sumValues.sum) + "$"; 
    this.tdQuantity.innerText = sumValues.quantity;
}

/*és most meghívjuk a plusMinus-t a plusBtn.addEventListenerben meg utána a minuszban is*/

plusBtn.addEventListener ("click", ()=> {
    const newQuantity = product.quantity + 1;
    // divQuantity.innertext = newQuantity;
    // this.changeQuantity(id, 1)

    // tdSubSum.innerText = (newQuantity * price) + "$";

    // const sumValues = this.sum()
    // this.tdAmount.innerText = (sumValues.quantity * sumValues.sum) + "$"; 
    // this.tdQuantity.innerText = sumValues.quantity;

    this.plusMinus(product.productID, product.price, newQuantity, divQuantity, tdSubSum);
    //és itt sorban átadjuk neki a dolgokat és akkor ezt a két sort kell írnunk 
})

minusBtn.addEventListener ("click", ()=> {
    const newQuantity = product.quantity-1;
    // divQuantity.innertext = newQuantity;
    // this.changeQuantity(id, -1)

    // tdSubSum.innerText = (newQuantity * price) + "$";

    // const sumValues = this.sum()
    // this.tdAmount.innerText = (sumValues.quantity * sumValues.sum) + "$"; 
    // this.tdQuantity.innerText = sumValues.quantity;

    this.plusMinus(product.productID, product.price, newQuantity, divQuantity, tdSubSum);
    //és itt is sorban átadjuk neki a dolgokat és akkor ezt a két sort kell írnunk 

    if(newQuantity === 0)
        tr.remove();
})
/*******************************************************************************************************/
/*Utolsó dolog a kosár ürítése amit még meg kell csinálnunk, ha rányomunk leagalul a kosár ürítése gombra*/
emptyCart() {
    this.cart = [];
    localStorage.setItem("cart", "[]");
    // azt is beírhatnánk, "[]" helyett, hogy JSON.stringify ugyanez, de felesleges mert ugyanaz lesz az értéke

    // this.tdAmount = "0$"
    // this.tdQuantity = 0;

    this.showCart(); // első sorában csinálunk egy this.cartBody.innerHTML = "" - hogy alapból kiürítse és ne jelenjen meg semmi"
    //this.showSum(); -> felesleges meghívni itt külön, mert már egyszer meg lett hívva a showCart()-ban 

    /*itt meg adunk a tdDelete-nek egy eventListenert*/
    const tr = document.createElement("tr");
    //utána csinálunk egy td-t ami négy oszlopot vesz fel -> colspan nevű tulajdonság az 4 lesz 
    const tdSum = document.createElement("td");
    tdSum.colSpan = 4;
    tdSum.innerHTML = '<h4>Összesen</h4>';

    const tdQuatity = document.createElement("td"); /*változtatás lejjebb this.*/
    tdQuantity.innerText = quantity;                /*változtatás lejjebb this.*/

    const tdAmount = document.createElement("td");  /*változtatás lejjebb this.*/
    tdAmount.colSpan = 2;                           /*változtatás lejjebb this.*/
    tdAmount.innerText = (sum * quantity) + "$";    /*változtatás lejjebb this.*/

    const tdDelete = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Kosár ürítése";

    tdDelete.appendChild(deleteBtn);

    tr.appendChild(tdSum);
    tr.appendChild(tdQuantity);  /*változtatás lejjebb this.*/
    tr.appendChild(tdAmount);    /*változtatás lejjebb this.*/
    tr.appendChild(tdDelete);

    this.cartBody.appendChild(tr);

    tdDelete.addEventListener("click", ()=>{
        this.emptyCart();
    });
}

/*
Local storage: kliens oldali adatszerkezet, amit a böngésző tárol és azért jó, mert globálisan elérhető minden oldalon 
Milyen adatokat lehet tárolni a localStorage-ban -> stringeket, nem tudunk sem objektumokat, sem tömböket
Mi a megoldás arra, hogy tudjunk összetett adatszerkezetek tárolni a localStorage-ban ->JSON.stringify
összerakunk egy tömböt, amiben objetumok vannak és egy JSON.stringben jelenítjük meg az adatokat 

Arra kell vigyázni, hogy amikor belerakunk, kiveszünk, módosítunk valamit, akkor minden esetben
a cart-ot is módosítsuk a class Cart-on belüli cart-ot és változót és annak megfelelően a localStorage-ot is 

Ha törölni vagy módosítani szeretnénk, akkor egyszerűen id alapján find-val vagy findIndex-velm megkeressük, indexre van szükség ahhoz, hogy
a cart-ban megtaláljuk a helyét, megtaláljuk az indexét és töröljük vagy módosítjuk 

pl. a quantity-nál megtaláljuk az adott id-val rendelkező terméket, annak az indexét visszaadjuk és a quantity-jét növeljük a quantityvel
és itt is vigyázunk arra, hogyha megcsináltuk a módosítást, akkor a localStorageban is meg kell, hogy jelenjen ez az érték 
*/
