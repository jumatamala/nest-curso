import { existsSync } from 'fs';
import { join } from 'path';

import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticImage(imageName: string) {
    const path = join(__dirname, '../../static/product', imageName);

    if (!existsSync(path)) {
      throw new NotFoundException(`image ${imageName} not found`);
    }
    return path;
  }
}
