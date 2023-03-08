import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Searcher } from "./entity/searcher.entity";

@Injectable()
export class SearcherRepository extends Repository<Searcher> {
  constructor(private dataSource: DataSource) {
    super(Searcher, dataSource.createEntityManager());
  }

  async findEventposts() {
    const result = await this.createQueryBuilder()
      .select("search")
      .from(Searcher, "search")
      .orderBy("search.view", "DESC")
      .getMany();
    return result;
  }
}

//         findByEventPosts(results : string): Promise<Searcher>{
//             const results = this.searchjrepository.findOne({results});
//         }

//     }


// searchAllProducts = async (term) => {
//     console.log('여긴 레포지토리, 검색한 키워드는?', term);
//     const searchdata = await this.productModel.findAll({
//       where: {
//         [Op.or]: [
//           { product_name: { [Op.like]: '%' + term + '%' } },
//           { product_detail: { [Op.like]: '%' + term + '%' } },
//         ],
//       },
//     });
//     return searchdata;
//   };