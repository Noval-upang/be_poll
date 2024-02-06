import mysql from 'mysql';

function connection() {
   const conn = mysql.createConnection({
      database: process.env.DATABASE,
      host:"localhost",
      user:"root",
      password:"1q2w3e4r",
   })

   conn.connect()
   return conn
}


function conditionCtx(condition:string[]) {
   return condition.join(" AND ")
}

export function Query<T extends {}|undefined>(ctx:string) {
   return new Promise((res, rej)=>{
      connection().query(ctx, (err, r, f)=>{
         if (err) rej(err)
         return res({result:r, field:f})
      })
   }) as Promise<{result:T, field:mysql.FieldInfo[] | undefined}>
}

export async function Select<T extends {}>(table:string, ...condition:string[]) {
   return Query<T[]>(`SELECT * FROM ${table} WHERE ${conditionCtx(condition)}`)
}

export async function Delete(table:string, ...condition:string[]) {
   return Query<undefined>(`DELETE FROM ${table} WHERE ${conditionCtx(condition)}`)
}

export async function Insert(table:string, values:{}[]) {
   const arrValues = values.map(i=>Object.entries(i).filter(([key,_])=>key!=="id"))
   return Query<undefined>(`INSERT INTO  ${table} VALUES`) 
}