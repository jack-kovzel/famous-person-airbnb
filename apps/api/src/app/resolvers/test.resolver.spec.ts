import { Test, TestingModule } from '@nestjs/testing';
import { FamousPersonResolver } from './famousPersonResolver';

describe('TestResolver', () => {
  let resolver: FamousPersonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamousPersonResolver],
    }).compile();

    resolver = module.get<FamousPersonResolver>(FamousPersonResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
