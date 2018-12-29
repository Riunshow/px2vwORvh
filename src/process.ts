export default class Process {
    constructor(private config: any) { }
    private regPx: RegExp = /([-]?[\d.]+)p(x)?/;
    private regPxAll: RegExp = /([-]?[\d.]+)px/g;

    convert(text: string) {
        let match = text.match(this.regPx)
        if (!match) return '';
        return this.px2vwORvh(match[1]);
    }

    convertAll(text: string): string {
        if (!text) return text;
        return text.replace(this.regPxAll, (word: string) => {
            const res = this.px2vwORvh(word);
            if (res) return res.vw;
            return word;
        });
    }

    private px2vwORvh(text: string) {
        const pxValue = parseFloat(text);

        let vw: string = +(pxValue / this.config.width * 100).toFixed(this.config.toFixedNum) + 'vw';
        let vh: string = +(pxValue / this.config.height * 100).toFixed(this.config.toFixedNum) + 'vh';
        return {
            px: text,
            pxValue: pxValue,
            vw: vw,
            vh: vh
        }
    }
}