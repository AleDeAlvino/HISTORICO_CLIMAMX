const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async()=>{
    console.log("Hola");
    await delay(3000);
    
    console.log("Adios");
})();

console.log("Yo estoy afuera");
