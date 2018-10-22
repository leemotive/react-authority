# react-authority

## install
`$ npm install react-authority --save-dev`

## usage
```javascript
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ReactAuthority from 'react-authority';

ReactDOM.render((
  <ReactAuthority code="create" permission={['create']}>
    <button>创建</button>
  </ReactAuthority>
), document.getElementById('root'));

ReactDOM.render((
  <ReactAuthority code="detail" permission={['create']}>
    <ReactAuthority.Admit>
      <a href="url-to-detail">查看详情</a>
    </ReactAuthority.Admit>
    <ReactAuthority.Deny>
      没有查看权限，没有链接
    </ReactAuthority.Deny>
  </ReactAuthority>
), document.getElementById('root'));
```
