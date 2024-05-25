const Base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";  //API 

const dropdowns=document.querySelectorAll(".dropdown select");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const converter=document.querySelector(".converter");
const button=document.querySelector("#btn");
let msg=document.querySelector(".msg");

const updateExchangeRate=async ()=>{
	let amount=document.querySelector(".amount input");
	let amtVal=amount.value; //Accessing amount from input field
	// console.log(amtVal);
	if(amtVal===''||amtVal<1){
		amtVal=1;
		amount.value="1";
	}
	const URL=`${Base_URL}/${from.value.toLowerCase()}.json`;
	let response=await fetch(URL);
	let data=await response.json();
	// console.log(data);
	let rate=data[from.value.toLowerCase()][to.value.toLowerCase()];
	// console.log(rate);

	let finalAmt=amtVal*rate;
	// console.log(finalAmt);
	msg.classList.remove("hide");
	msg.innerText=finalAmt;
}

for(let select of dropdowns){
	for(currCode in countryList){
		let newOption=document.createElement("option");
		newOption.innerText=currCode;
		newOption.value=currCode;
		if(select.name==="from"&&currCode==="USD"){
			newOption.selected="selected";
		}else if(select.name==="to"&&currCode==="INR"){
			newOption.selected="selected";
		}
		select.append(newOption);
	}
	select.addEventListener("change",(evt)=>{
	updateFlag(evt.target);
	updateExchangeRate();
});


}

const updateFlag=(element)=>{
	let currCode=element.value;
	let countryCode=countryList[currCode];
	let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`
	let img=element.parentElement.querySelector("img");
	img.src=newSrc;
}

const swapping=()=>{
	const temp=from.value;
	from.value=to.value;
	to.value=temp;
	updateFlag(from);
	updateFlag(to);
	
}


converter.addEventListener("click",(evt)=>{
	swapping();
	updateExchangeRate();
	
});

button.addEventListener("click",async (evt)=>{
	evt.preventDefault();

	updateExchangeRate();
});

window.addEventListener("load",()=>{
	updateExchangeRate();
});