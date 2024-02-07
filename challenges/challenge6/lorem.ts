import { LoremIpsum } from "lorem-ipsum";
import * as fs from "fs";
import * as exec from "child_process"

// This is the script used to generate the lorem ipsum text.

(async () => {
    

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  var sentences:string[]  = [];
  
  var flagDirectory="/home/thomas/Projekte/CTF_Beginners_Git_Challenge/repo/challenge5/";
  var flagName="flag.txt";
  var flag="flag_c95b327a5b0e954a558917da5192b47588979c4b_"
  for (let index = 1; index <= 500; index++) {
     
     if (index==290)
     {
         sentences.unshift(flag);
        
     } else
     if (index==291)
     {
         sentences.shift();
       
     } else
     {
        var probability= sentences.length / (70 *Math.random()+1);

        if (probability > 1)
        {
            sentences.splice(Math.random()*sentences.length,1);
            console.log(1);
        } else if (probability > 0.5)
        {
            sentences.splice(Math.random()*sentences.length,1,...[lorem.generateSentences(1)]);
            console.log(2);
        } else
        {
            sentences.push(lorem.generateSentences(1));        
            console.log(3);
        }
     }
     var text= sentences.join("\n");
     await new Promise( (value)=>
     {
         fs.writeFile(flagDirectory +flagName, text ,value); 
     }
     );
     
     var command="cd "+flagDirectory +";git commit -am "+ '"Lorem ipsum '+index + '"';
     
     await new Promise( (value)=>
     {
        exec.exec(command,null,value);
     }
     );
  }

})();

  
  


 
 
