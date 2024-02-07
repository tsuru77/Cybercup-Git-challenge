import { LoremIpsum } from "lorem-ipsum";
import * as fs from "fs";
import * as exec from "child_process"
import * as faker from "faker"
import * as crypto from "crypto"
type user = { name: string, mail: string };

(async () => {
    var flagUser: user = {
        name: faker.name.findName(),
        mail: "flag_0ba47830b4d491624818012341ee1e89f3431d71_@ctf.com"
    };
    var users: user[] = [];

    for (var i = 0; i < 10; i++) {
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        var shasum = crypto.createHash('sha1')
        shasum.update(Math.random().toString());
        var email= "flag_"+shasum.digest('hex') + "_@ctf.com" ;

        users.push(
            {
                name: firstName + " " + lastName,
                mail: email
            }
        );
    }


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

    var sentences: string[] = [];

    var flagDirectory = "/home/thomas/Projekte/CTF_Beginners_Git_Challenge/repo/challenge6/";
    var flagName = "flag.txt";
    var template =        
`#include<stdio.h>

int main() {
{code}
	return 0;
}
`;
    var flagIndex=60;
    for (let index = 1; index <= 100; index++) {
        var user: user;
        if (index == flagIndex) {
            sentences.unshift("BUG");
            user = flagUser;
        } else {
            var probability = sentences.length / (70 * Math.random() + 1);
            
            if (probability > 1) {
                sentences.splice( (Math.random() * (sentences.length-1))+1 ,1);
                console.log(1);
            } else if (probability > 0.5) {
                sentences[Math.floor((Math.random() * (sentences.length-1))+1)]= "printf(\"" + lorem.generateSentences(1) + "\");";
                console.log(2);
            } else {
                sentences.push("printf(\"" + lorem.generateSentences(1) + "\");");
                console.log(3);
            }
            user = users[Math.floor(Math.random() * users.length)];
        }
        var text = template.replace("{code}", "\t"+ sentences.join("\n\t"));
        await new Promise((value) => {
            fs.writeFile(flagDirectory + flagName, text, value);
        }
        );


        var command = "cd " + flagDirectory + ";" +
            "git config --local user.email " + user.mail + ";" +
            "git config --local user.name \"" + user.name + "\";" +
            "git commit -am " + '"Lorem ipsum ' + index + '"';

        await new Promise((value) => {
            exec.exec(command, null, value);
        }
        );
    }

})();







