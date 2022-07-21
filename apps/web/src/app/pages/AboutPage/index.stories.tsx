import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AboutPage } from './index';

export default {
  component: AboutPage,
  title: 'AboutPage',
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => (
  <AboutPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
