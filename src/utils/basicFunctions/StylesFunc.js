export function __themeStyleFunc(style, globalStyle) {
  let hStyle = {};
  if (style === undefined) {
    return globalStyle;
  } else {
    if (globalStyle === undefined) {
      return style;
    } else {
      Object.keys(globalStyle).map((fKey) => {
        if (style[fKey]) {
          hStyle = {
            ...hStyle,
            [fKey]: { ...globalStyle[fKey], ...style[fKey] },
          };
        } else {
          hStyle = { ...hStyle, [fKey]: { ...globalStyle[fKey] } };
        }
      });
      Object.keys(style).map((fKey) => {
        if (globalStyle[fKey]) {
          hStyle = {
            ...hStyle,
            [fKey]: { ...globalStyle[fKey], ...style[fKey] },
          };
        } else {
          hStyle = { ...hStyle, [fKey]: { ...style[fKey] } };
        }
      });
      return hStyle;
    }
  }
}

export default function __stylesFunc(style, globalStyle, styleKey) {
  globalStyle = globalStyle
    ? globalStyle[styleKey] !== undefined
      ? globalStyle[styleKey]
      : false
    : false;

  let newStyle =
    style !== undefined ? (Array.isArray(style) ? style : [style]) : [];

  if (globalStyle) {
    newStyle =
      newStyle.length !== 0 ? [globalStyle, ...newStyle] : [globalStyle];
  }

  let hStyle = {};

  newStyle.forEach((item) => {
    hStyle = { ...hStyle, ...item };
  });

  return [hStyle];
}
