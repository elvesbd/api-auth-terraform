import { App } from 'cdktf';
import { ProjectStack } from './stacks/project.stack';

const app = new App();

new ProjectStack(app, 'infra', {
  region: 'us-east-1',
  environmentName: 'dev',
});

/* new ProjectStack(app, 'infra', {
  environmentName: 'prod',
}); */

app.synth();
