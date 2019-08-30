import * as React from 'react';
import {
  getExtensionSlot,
  ErrorInfoProps,
  NotFoundErrorInfoProps,
  PageErrorInfoProps,
  TileErrorInfoProps,
  MenuItemErrorInfoProps,
  LoadingErrorInfoProps,
  FeedErrorInfoProps,
  FormErrorInfoProps,
} from 'piral-core';
import { UnknownErrorInfoProps } from '../types';

const ExtensionSlot = getExtensionSlot('error');

export interface ErrorInfoCreator {
  NotFoundErrorInfo: React.ComponentType<NotFoundErrorInfoProps>;
  PageErrorInfo: React.ComponentType<PageErrorInfoProps>;
  LoadingErrorInfo: React.ComponentType<LoadingErrorInfoProps>;
  FeedErrorInfo?: React.ComponentType<FeedErrorInfoProps>;
  FormErrorInfo?: React.ComponentType<FormErrorInfoProps>;
  TileErrorInfo?: React.ComponentType<TileErrorInfoProps>;
  MenuErrorInfo?: React.ComponentType<MenuItemErrorInfoProps>;
  UnknownErrorInfo: React.ComponentType<UnknownErrorInfoProps>;
}

export function createErrorInfo({
  NotFoundErrorInfo,
  PageErrorInfo,
  LoadingErrorInfo,
  FeedErrorInfo,
  TileErrorInfo,
  MenuErrorInfo,
  FormErrorInfo,
  UnknownErrorInfo,
}: ErrorInfoCreator): React.FC<ErrorInfoProps> {
  function getErrorInfo(props: ErrorInfoProps) {
    switch (props.type) {
      case 'not_found':
        return <NotFoundErrorInfo {...props} />;
      case 'page':
        return <PageErrorInfo {...props} />;
      case 'tile':
        return <TileErrorInfo {...props} />;
      case 'menu':
        return <MenuErrorInfo {...props} />;
      case 'loading':
        return <LoadingErrorInfo {...props} />;
      case 'feed':
        return <FeedErrorInfo {...props} />;
      case 'form':
        return <FormErrorInfo {...props} />;
      default:
        return <UnknownErrorInfo />;
    }
  }

  return props => (
    <>
      {getErrorInfo(props)}
      <ExtensionSlot params={props} />
    </>
  );
}
