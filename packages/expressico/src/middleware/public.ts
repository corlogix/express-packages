import express from 'express';

export const useStatic = () => express.static('dist/public');