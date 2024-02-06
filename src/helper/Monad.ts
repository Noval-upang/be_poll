
export type Status<Ok,Err> = {ok:true, value:Ok} | {ok:false, value:Err}
type Next<T, R> = (v:T)=>R

class Maybe<Ok, Err> {
   constructor(
      private bind:Status<Ok, Err>
   ) {}

   binding<T>(func:Next<Ok, Status<T, Err>>) {
      return this.bind.ok ? new Maybe(func(this.bind.value)) : this
   }

   success(func:Next<Ok, any>) {
      this.bind.ok && func(this.bind.value)
      return this
   }

   failed(func:Next<Err, any>) {
      !this.bind.ok && func(this.bind.value)
      return this
   }
}

export function Monad<Ok, Err>(bind:Ok) {
   return new Maybe<Ok, Err>({ok:true, value:bind})
}