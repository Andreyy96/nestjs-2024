import { ListArticleQueryReqDto } from '../req/list-article-query.req.dto';
import { ArticleResDto } from './article.res.dto';

export class ArticleListResDto extends ListArticleQueryReqDto {
  data: ArticleResDto[];
  total: number;
}
