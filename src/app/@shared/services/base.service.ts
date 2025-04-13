

export interface IBaseService<DTO, OUTPUT> {
  execute(dto: DTO): Promise<OUTPUT>;
}

