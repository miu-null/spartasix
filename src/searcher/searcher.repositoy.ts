import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Searcher } from "./entity/searcher.entity";

@CustomRepository(Searcher)
export class SearcherRepository extends Repository<Searcher> {
    // constructor(
    //     @InjectRepository(Searcher)
    //     private searchjrepository: Repository<Searcher>
    // ) {}
};

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