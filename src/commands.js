import { directories } from "./directories.js";

const dirs = directories();

const root = "~";
let cwd = root;

export function commands() {
    const result = {
        help() {
            this.echo(`Commands: ${help}`);
        },
        echo(...args) {
            if (args.length > 0) {
                this.echo(args.join(" "));
            }
        },
        cd(dir = null) {
            if (dir === null || (dir === ".." && cwd !== root)) {
                cwd = root;
            } else if (dir.startsWith("~/") && Object.keys(dirs).includes(dir.substring(2))) {
                cwd = dir;
            } else if (Object.keys(dirs).includes(dir)) {
                cwd = root + "/" + dir;
            } else {
                this.error("Wrong directory");
            }
        },
    };

    const help = formatHelp(result);

    return result;
}


function formatHelp(commands) {
    const command_list = ["clear"].concat(Object.keys(commands));

    const formatter = new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
    });

    const formatted_list = command_list.map((cmd) => {
        return `<white class="command">${cmd}</white>`;
    });

    formatTypeArea(command_list);

    return formatter.format(formatted_list);
}

function formatTypeArea(command_list) {
    const reg = new RegExp(`^\s*(${command_list.join("|")}) (.*)`);

    $.terminal.new_formatter(function (string) {
        return string.replace(reg, function (_, command, args) {
            return `<bold><lime>${command}</lime></bold> <white>${args}</white>`;
        });
    });
}

export function prompt() {
    const user = "guest ";
    const server = "streambit.dev";
    console.log(cwd);
    return `<lightgreen>${user}</lightgreen><Fuchsia>@</Fuchsia><orange>${server}:</orange><aqua>${cwd}</aqua><Fuchsia>$</Fuchsia> `;
}
