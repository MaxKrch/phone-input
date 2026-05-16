export enum maskSegmentKind {
    digit = 'digit',
    char = 'char',
}

export type DigitSegment = {
    kind: maskSegmentKind.digit,
    maskIndex: number,
    inputIndex: number,
    value: string,
}

export type CharSegment = {
    kind: maskSegmentKind.char,
    maskIndex: number,
    value: string,
}

export type MaskSegment = DigitSegment | CharSegment;

export const isDigitSegment = (segment: MaskSegment): segment is DigitSegment => {
    return segment.kind === maskSegmentKind.digit;
}

export const isCharSegment = (segment: MaskSegment): segment is CharSegment => {
    return segment.kind === maskSegmentKind.char;
}
