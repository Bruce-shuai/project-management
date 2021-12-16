import React from 'react';

// 使用的why-did-you-render工具，用来及时检验项目造成死循环的原因是什么...
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  })
}