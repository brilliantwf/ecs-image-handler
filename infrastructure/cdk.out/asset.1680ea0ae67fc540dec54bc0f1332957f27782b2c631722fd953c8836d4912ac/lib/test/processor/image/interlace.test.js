"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
const interlace_1 = require("../../../src/processor/image/interlace");
const utils_1 = require("./utils");
test('Interlace action validate', () => {
    const action = new interlace_1.InterlaceAction();
    const param1 = action.validate('interlace,1'.split(','));
    expect(param1).toEqual({
        interlace: true,
    });
    expect(() => {
        action.validate('interlace'.split(','));
    }).toThrowError(/Interlace param error, e.g: interlace,1/);
    expect(() => {
        action.validate('interlace,xx,22'.split(','));
    }).toThrowError(/Interlace param error, e.g: interlace,1/);
    expect(() => {
        action.validate('interlace,ab'.split(','));
    }).toThrowError(/Interlace must be 0 or 1/);
    expect(() => {
        action.validate('interlace,-3'.split(','));
    }).toThrowError(/Interlace must be 0 or 1/);
    expect(() => {
        action.validate('interlace,3'.split(','));
    }).toThrowError(/Interlace must be 0 or 1/);
});
test('interlace,1', async () => {
    const ctx = await (0, utils_1.mkctx)('example.jpg');
    const action = new interlace_1.InterlaceAction();
    await action.process(ctx, 'interlace,1'.split(','));
    const { info } = await ctx.image.toBuffer({ resolveWithObject: true });
    expect(info.format).toBe(sharp.format.jpeg.id);
});
test('interlace,0', async () => {
    const ctx = await (0, utils_1.mkctx)('example.jpg');
    const action = new interlace_1.InterlaceAction();
    await action.process(ctx, 'interlace,0'.split(','));
    const { info } = await ctx.image.toBuffer({ resolveWithObject: true });
    expect(info.format).toBe(sharp.format.jpeg.id);
});
test('interlace,1 for gif', async () => {
    const ctx = await (0, utils_1.mkctx)('example.gif');
    const action = new interlace_1.InterlaceAction();
    await action.process(ctx, 'interlace,1'.split(','));
    const { data, info } = await ctx.image.toBuffer({ resolveWithObject: true });
    expect(info.format).toBe(sharp.format.gif.id);
    const metadata = await sharp(data, { animated: true }).metadata();
    expect(metadata.pages).toBe(3);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJsYWNlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L3Byb2Nlc3Nvci9pbWFnZS9pbnRlcmxhY2UudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUMvQixzRUFBeUU7QUFDekUsbUNBQWdDO0FBRWhDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDckMsTUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBZSxFQUFFLENBQUM7SUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNyQixTQUFTLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFFM0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNWLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFFM0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNWLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBRTVDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDVixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUU1QyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFOUMsQ0FBQyxDQUFDLENBQUM7QUFHSCxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBQSxhQUFLLEVBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBZSxFQUFFLENBQUM7SUFDckMsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDO0FBR0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLElBQUksRUFBRTtJQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsYUFBSyxFQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQWUsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLElBQUksRUFBRTtJQUNyQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsYUFBSyxFQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQWUsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFFN0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzaGFycCBmcm9tICdzaGFycCc7XG5pbXBvcnQgeyBJbnRlcmxhY2VBY3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zcmMvcHJvY2Vzc29yL2ltYWdlL2ludGVybGFjZSc7XG5pbXBvcnQgeyBta2N0eCB9IGZyb20gJy4vdXRpbHMnO1xuXG50ZXN0KCdJbnRlcmxhY2UgYWN0aW9uIHZhbGlkYXRlJywgKCkgPT4ge1xuICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJsYWNlQWN0aW9uKCk7XG4gIGNvbnN0IHBhcmFtMSA9IGFjdGlvbi52YWxpZGF0ZSgnaW50ZXJsYWNlLDEnLnNwbGl0KCcsJykpO1xuICBleHBlY3QocGFyYW0xKS50b0VxdWFsKHtcbiAgICBpbnRlcmxhY2U6IHRydWUsXG4gIH0pO1xuXG4gIGV4cGVjdCgoKSA9PiB7XG4gICAgYWN0aW9uLnZhbGlkYXRlKCdpbnRlcmxhY2UnLnNwbGl0KCcsJykpO1xuICB9KS50b1Rocm93RXJyb3IoL0ludGVybGFjZSBwYXJhbSBlcnJvciwgZS5nOiBpbnRlcmxhY2UsMS8pO1xuXG4gIGV4cGVjdCgoKSA9PiB7XG4gICAgYWN0aW9uLnZhbGlkYXRlKCdpbnRlcmxhY2UseHgsMjInLnNwbGl0KCcsJykpO1xuICB9KS50b1Rocm93RXJyb3IoL0ludGVybGFjZSBwYXJhbSBlcnJvciwgZS5nOiBpbnRlcmxhY2UsMS8pO1xuXG4gIGV4cGVjdCgoKSA9PiB7XG4gICAgYWN0aW9uLnZhbGlkYXRlKCdpbnRlcmxhY2UsYWInLnNwbGl0KCcsJykpO1xuICB9KS50b1Rocm93RXJyb3IoL0ludGVybGFjZSBtdXN0IGJlIDAgb3IgMS8pO1xuXG4gIGV4cGVjdCgoKSA9PiB7XG4gICAgYWN0aW9uLnZhbGlkYXRlKCdpbnRlcmxhY2UsLTMnLnNwbGl0KCcsJykpO1xuICB9KS50b1Rocm93RXJyb3IoL0ludGVybGFjZSBtdXN0IGJlIDAgb3IgMS8pO1xuXG4gIGV4cGVjdCgoKSA9PiB7XG4gICAgYWN0aW9uLnZhbGlkYXRlKCdpbnRlcmxhY2UsMycuc3BsaXQoJywnKSk7XG4gIH0pLnRvVGhyb3dFcnJvcigvSW50ZXJsYWNlIG11c3QgYmUgMCBvciAxLyk7XG5cbn0pO1xuXG5cbnRlc3QoJ2ludGVybGFjZSwxJywgYXN5bmMgKCkgPT4ge1xuICBjb25zdCBjdHggPSBhd2FpdCBta2N0eCgnZXhhbXBsZS5qcGcnKTtcbiAgY29uc3QgYWN0aW9uID0gbmV3IEludGVybGFjZUFjdGlvbigpO1xuICBhd2FpdCBhY3Rpb24ucHJvY2VzcyhjdHgsICdpbnRlcmxhY2UsMScuc3BsaXQoJywnKSk7XG4gIGNvbnN0IHsgaW5mbyB9ID0gYXdhaXQgY3R4LmltYWdlLnRvQnVmZmVyKHsgcmVzb2x2ZVdpdGhPYmplY3Q6IHRydWUgfSk7XG4gIGV4cGVjdChpbmZvLmZvcm1hdCkudG9CZShzaGFycC5mb3JtYXQuanBlZy5pZCk7XG59KTtcblxuXG50ZXN0KCdpbnRlcmxhY2UsMCcsIGFzeW5jICgpID0+IHtcbiAgY29uc3QgY3R4ID0gYXdhaXQgbWtjdHgoJ2V4YW1wbGUuanBnJyk7XG4gIGNvbnN0IGFjdGlvbiA9IG5ldyBJbnRlcmxhY2VBY3Rpb24oKTtcbiAgYXdhaXQgYWN0aW9uLnByb2Nlc3MoY3R4LCAnaW50ZXJsYWNlLDAnLnNwbGl0KCcsJykpO1xuICBjb25zdCB7IGluZm8gfSA9IGF3YWl0IGN0eC5pbWFnZS50b0J1ZmZlcih7IHJlc29sdmVXaXRoT2JqZWN0OiB0cnVlIH0pO1xuICBleHBlY3QoaW5mby5mb3JtYXQpLnRvQmUoc2hhcnAuZm9ybWF0LmpwZWcuaWQpO1xufSk7XG5cbnRlc3QoJ2ludGVybGFjZSwxIGZvciBnaWYnLCBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGN0eCA9IGF3YWl0IG1rY3R4KCdleGFtcGxlLmdpZicpO1xuICBjb25zdCBhY3Rpb24gPSBuZXcgSW50ZXJsYWNlQWN0aW9uKCk7XG4gIGF3YWl0IGFjdGlvbi5wcm9jZXNzKGN0eCwgJ2ludGVybGFjZSwxJy5zcGxpdCgnLCcpKTtcbiAgY29uc3QgeyBkYXRhLCBpbmZvIH0gPSBhd2FpdCBjdHguaW1hZ2UudG9CdWZmZXIoeyByZXNvbHZlV2l0aE9iamVjdDogdHJ1ZSB9KTtcblxuICBleHBlY3QoaW5mby5mb3JtYXQpLnRvQmUoc2hhcnAuZm9ybWF0LmdpZi5pZCk7XG5cbiAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBzaGFycChkYXRhLCB7IGFuaW1hdGVkOiB0cnVlIH0pLm1ldGFkYXRhKCk7XG4gIGV4cGVjdChtZXRhZGF0YS5wYWdlcykudG9CZSgzKTtcbn0pOyJdfQ==