interface UnitOfWorkRepository {
  work: <T>(callback: () => Promise<T>) => Promise<T>;
}

export default UnitOfWorkRepository;
