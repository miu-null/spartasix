import { Injectable } from "@nestjs/common";
import { getRepositoryToken, InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Searcher } from "./entity/searcher.entity";
import { Like } from "typeorm";
import { CreateSearchDto } from "./dto/create.search.dto";

@Injectable()
export class SearcherRepository {
  constructor(
    @InjectRepository(Searcher)
    private readonly searcherRepository: Repository<Searcher>,
  ) {}

//   async findEventposts(data): Promise<Searcher[]> {{
//     console.log(data.term, '리포지토리 진입')
//     const results = await this.searcherRepository
//     .find({
//       where : {
//         // title : Like OR
//         content: Like(`%${data.term}%`)}})
    
//     // createQueryBuilder("name")
//     // .where("searcher.name LIKE: s", {s : `%${name}%`})
//     return results
//   }
// }

  async findEventposts(data: any): Promise<Searcher[]> {
    {
      console.log(`%${data.term}%`, data, "리포지토리 진입");
      const results = await this.searcherRepository
        .createQueryBuilder('search')
        .where('search.title LIKE :s OR search.content LIKE :s', { s: `%${data.term}%` })
        .getMany();
      console.log(results);
      return results
    }
  }




      //         `%${term}%`)}})

        // .where("searcher.name LIKE: s", {s : `%${name}%`})
      //   return results
      // }
  //   }
  // }

  // const results = await getRepository(Searcher).createQueryBuilder("user")
  // .where("user.name LIKE : name", {name : `%${name}%`})    
  // .getMany();
  // return results
  // }}


  async ArticleCreate(createSearchDto : CreateSearchDto) : Promise<Searcher> {
    console.log(createSearchDto, '리포지토리 진입')
    const {title, content} = createSearchDto
    const article = this.searcherRepository.create(createSearchDto)
    console.log('리포지토리 통과')

    await this.searcherRepository.save(article);
    return article
  }

}





//         findByEventPosts(results : string): Promise<Searcher>{
//             const results = this.searchjrepository.findOne({results});
//         }

//     }


// searchAllProducts = async (term) => {
//   console.log('여긴 레포지토리, 검색한 키워드는?', term);
//   const searchdata = await this.productModel.findAll({
//     where: { product_name: { [Op.like]: '%' + term + '%' } }
//   });
// };
// return searchdata;

// 'MATCH(name) AGAINST (:name IN BOOLEAN MODE)', 

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