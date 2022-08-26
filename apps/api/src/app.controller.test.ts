import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    })
      .useMocker((token) => {
        if (token === AppService) {
          return {
            startingMessage: jest.fn().mockResolvedValue({
              message:
                'Welcome to api! Navigate to api/v1/docs for documentation.',
            }),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<unknown, unknown[]>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStartingMessage', () => {
    it('should return "Welcome to api! Navigate to api/v1/docs for documentation."', async () => {
      expect(await controller.getStartingMessage()).toEqual({
        message: 'Welcome to api! Navigate to api/v1/docs for documentation.',
      });
    });
  });
});
