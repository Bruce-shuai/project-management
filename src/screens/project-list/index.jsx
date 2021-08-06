import React from 'react';
import { List } from './list';
import { SearchPanel } from './search-panel';
export const ProjectList = () => {
  return <>
    <SearchPanel />
    <List />
  </>
}