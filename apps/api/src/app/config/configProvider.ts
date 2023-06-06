import { ConfigContainer } from '@app/config/ConfigContainer';
import { EnvironmentVariables } from '@app/config/EnvironmentVariables';
import { ProcessEnvWrapper } from '@app/config/ProcessEnvWrapper';
import { Provider } from '@nestjs/common';

const createValidatedEnvironmentVariablesProvider = (): Provider => ({
  provide: EnvironmentVariables,
  useFactory: (): EnvironmentVariables =>
    new EnvironmentVariables(new ProcessEnvWrapper(process.env)),
});

const configContainerProvider: Provider = {
  provide: ConfigContainer,
  useFactory: (
    validatedEnvironmentVariables: EnvironmentVariables,
  ): ConfigContainer => new ConfigContainer(validatedEnvironmentVariables),
  inject: [EnvironmentVariables],
};

export const CUSTOM_CONFIG_PROVIDERS = [
  createValidatedEnvironmentVariablesProvider(),
  configContainerProvider,
];
