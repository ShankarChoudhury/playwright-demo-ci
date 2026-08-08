import {test as base} from '@playwright/test';

type Myfixture = {
  helloworld: any;
  newworld: any;
}

export const test = base.extend<Myfixture>({
   helloworld: async ({}, use) => {
    const time = new Date().toISOString();     
   await use(time);
   console.log("Bye Bye World");      
}, 
newworld: async ({}, use) => {
   console.log("playwright");      
   await use();
}
})