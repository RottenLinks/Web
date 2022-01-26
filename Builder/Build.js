
import { ensureDir } from "https://deno.land/std@0.122.0/fs/mod.ts";


const dir_topics = '../../Page/';
const dir_data = '../Data';

const repo = `https://rottenlinks.github.io/Web/`;
const favicon = `${ repo }/Resources/Logos/RottenLinks.png`;


await ensureDir(dir_topics);


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
            <link rel = 'stylesheet' type = 'text/css' href = './Resources/Styles/General.css'>
        </heady>
        <body>
            ${ toolcode }
        </body>
    </html>
`;

await Deno.writeTextFile(join(dir_topics,'index.html'),template);



function toolToHtml(tool){

    const preview = `${ repo }/Resources/Logos/${ tool.Logo }`;

    let content = '';

    if(tool.Tags.includes('GUI')){
        const { Integration } = tool;
        let integrations = '';
        for(const integration in Integration)
            integrations += `<li><b>${ integration }</b><code>${ Integration[integration] }</code></li>`
        content += `
            <div class = 'Integrations'>
                <h4>Integrates:</h4>
                <ul>${ integrations }</ul>
            </div>
        `;
    }

    return `
        <div class = 'Tool'>
            <div class = 'Side'>
                <img src = '${ preview }'>
            </div>
            <div class = 'Main'>
                <h2>${ tool.Name }</h2>
                <div class = 'Content'>
                    ${ content }
                </div>
            </div>
        </div>
    `;
}
