function createGenericNode (x,y,id){

	let x = x
	let y = y
	let id =id


	return {

	getX: () =>{
      return x
    },
    getY: ()=>{
      return y
    }
    getid: () =>{
    	return id
    }


	}



}