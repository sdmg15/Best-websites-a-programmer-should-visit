
declare module 'case' {
  namespace Case {
    function upper(str: string, fill: string, noApostrophes: boolean) : string;
    function upper(str: string, fill: string) : string;
    function upper(str: string) : string;

    function lower(str: string, fill: string, noApostrophes: boolean) : string;
    function lower(str: string, fill: string) : string;
    function lower(str: string) : string;

    function capital(str: string, fill: string, noApostrophes: boolean) : string;
    function capital(str: string, fill: string) : string;
    function capital(str: string) : string;

    function snake(str: string) : string;

    function pascal(str: string) : string;

    function camel(str: string) : string;

    function kebab(str: string) : string;

    function header(str: string) : string;

    function constant(str: string) : string;

    function title(str: string) : string;

    function sentence(str: string, names?: Array<string> | null, abbreviations?: Array<string>) : string;

    function of(str: string) : string;
    function of(str: string, names: Array<string>) : string;

    function flip(str: string) : string

    function random(str: string) : string;

    function type(type: string, converter: (str: string) => string) : string;
  }

  export = Case;
}
