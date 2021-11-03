import { Express } from "express";
import context from '../context';
import { consumeMiddleware, ExpressicoMiddleware } from './define';
import useLocalhostCors from './useLocalhostCors';
import useEnforcedHttps from './useEnforcedHttps';
import useJsonParsing from './useJsonParsing';
import useHelpfulResponses from './useHelpfulResponses';
import useControllers from './useControllers';
import useStatic from './useStatic';

export * from "./define";


export {
  useLocalhostCors,
  useEnforcedHttps,
  useJsonParsing,
  useHelpfulResponses,
  useControllers,
  useStatic
}

export default function middleware(app: Express) {
  
  const defaultMiddleware: ExpressicoMiddleware[] = [
    useLocalhostCors,
    useEnforcedHttps,
    useJsonParsing,
    useHelpfulResponses,
    ...(context.middleware || []),
    useControllers({
      controllers: context?.controllers,
      verbose: true,
    }),
    useStatic
  ];

  consumeMiddleware(app, defaultMiddleware);

};