
import {
  emptyDir,
  emptyDirSync,
} from "https://deno.land/std@0.122.0/fs/mod.ts";


const dir_topics = '../docs/';
const dir_data = '../Data';

const repo = `https://rottenlinks.github.io/Web/`;
const favicon = `${ repo }/Resources/Logos/RottenLinks.png`;


await emptyDir(dir_topics);


import { walk } from "https://deno.land/std@0.122.0/fs/mod.ts";
import { basename , join } from "https://deno.land/std@0.122.0/path/mod.ts";
import { parse } from "https://deno.land/std@0.122.0/encoding/yaml.ts";

const iterator = await walk(dir_data);

await iterator.next();

const tools = [];

for await (const entry of iterator){
    console.log(`Reading entry ⸢ ${ basename(entry.path).split('.')[0] } ⸥`);
    const content = await Deno.readTextFile(entry.path);
    const yaml = parse(content);
    console.log(yaml);
    tools.push(yaml);
}


const toolcode = tools.map(toolToHtml).join('\n');



const template = `
    <html>
        <head>
            <link rel = 'icon' type = 'image/png' href = '${ favicon }'>
            <link rel = 'stylesheet' type = 'text/css' href = '${ repo }/Resources/Styles/General.css'>
        </heady>
        <body>
            ${ toolcode }
        </body>
    </html>
`;

await Deno.writeTextFile(join(dir_topics,'index.html'),template);



function toolToHtml(tool){

    const preview = `${ repo }/Resources/Logos/${ tool.Logo }`;

    return `
        <div class = 'Tool'>
            <div class = 'Header'>
                <img src = '${ preview }'>
                <h2>${ tool.Name }</h2>
            </div>
        </div>
    `;
}
