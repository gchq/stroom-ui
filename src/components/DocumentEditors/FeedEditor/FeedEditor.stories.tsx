import * as React from 'react';

import {storiesOf} from '@storybook/react'

import fullTestData from '../../../testing/data';
import FeedEditor from '.';

const stories = storiesOf('Document Editors/Feed', module);

let uuid: string = fullTestData.dictionaries[0].uuid;

stories.add('editor', () => <FeedEditor docRefUuid={uuid} />);