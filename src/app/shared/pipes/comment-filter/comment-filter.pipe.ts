import { Pipe, PipeTransform } from '@angular/core';
import { Institution } from '@core/models/institution.model';
import { Comment } from '../../../core/models/comment.model';

@Pipe({
  name: 'commentFilter'
})
export class CommentFilterPipe implements PipeTransform {

  transform(comments: Comment[], institution: Institution): any {
    return comments.filter(comment => institution.comments.filter(c => c == comment._id));
  }

}
