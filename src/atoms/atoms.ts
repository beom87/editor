import { atom } from 'jotai';
import PreEditor, { DMElements } from '../editor/core';

export const authoringEditorAtom = atom<PreEditor | null>(null);

export const activeElementsAtom = atom<DMElements[] | null>(null);

export const toastAtom = atom({ message: '' });
