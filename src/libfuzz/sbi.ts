// "sbi" = "shell-built-ins"
function _print(): void { print(JSON.stringify(arguments)); }
export {_print as print };
