type ID = {id:number}

export type User = ID & {
   email:string
   password:string
}

export type Company = ID & {
   id_user:number
   name:string 
   codeAccess:string
}

export type Workers = ID & {
   id_user:number
   id_company:number
}

export type Product = ID & {
   id_company:number
   name:string
   category:string
   qty:number
   price:number
}

export type Selling = ID & {
   id_worker:number
   
   /**
    * id:number
    * qty:number
    * price:number
   */
   productList: string
   provit:number
   date:string
}