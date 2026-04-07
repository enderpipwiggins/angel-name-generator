import { expect } from 'chai';
import { AngelNameGeneratorService } from './angel-name-generator.service';

// Instantiate directly — no Angular DI needed for unit testing
const svc = new AngelNameGeneratorService();

describe('AngelNameGeneratorService', () => {

  describe('generate()', () => {

    it('returns the requested count of results', () => {
      const results = svc.generate({ count: 5 });
      expect(results).to.have.length(5);
    });

    it('defaults to 9 results', () => {
      const results = svc.generate();
      expect(results).to.have.length(9);
    });

    it('clamps count to a minimum of 1', () => {
      const results = svc.generate({ count: 0 });
      expect(results).to.have.length(1);
    });

    it('clamps count to a maximum of 48', () => {
      const results = svc.generate({ count: 100 });
      expect(results).to.have.length(48);
    });

    it('returns unique names', () => {
      const results = svc.generate({ count: 20 });
      const names = results.map(r => r.name.toLowerCase());
      const unique = new Set(names);
      expect(unique.size).to.equal(names.length);
    });

    it('each result has all expected fields', () => {
      const [angel] = svc.generate({ count: 1 });
      expect(angel).to.have.all.keys('name', 'root', 'meaning', 'domain', 'suffix', 'suffixMeaning', 'suffixTradition');
    });

    it('names begin with an uppercase letter', () => {
      const results = svc.generate({ count: 10 });
      for (const r of results) {
        expect(r.name[0]).to.equal(r.name[0].toUpperCase());
      }
    });

  });

  describe('tradition filtering', () => {

    it('hebrew — suffixes are -el, -iel, or -on', () => {
      const results = svc.generate({ tradition: 'hebrew', count: 30 });
      const suffixes = new Set(results.map(r => r.suffix));
      for (const s of suffixes) {
        expect(['-el', '-iel', '-on']).to.include(s);
      }
    });

    it('islamic — suffixes are -il, -ail, or none', () => {
      const results = svc.generate({ tradition: 'islamic', count: 30 });
      const suffixes = new Set(results.map(r => r.suffix));
      for (const s of suffixes) {
        expect(['-il', '-ail', 'none']).to.include(s);
      }
    });

    it('enochian — suffixes include -eel or -qiel', () => {
      const results = svc.generate({ tradition: 'enochian', count: 48 });
      const suffixes = new Set(results.map(r => r.suffix));
      expect([...suffixes].some(s => ['-eel', '-qiel'].includes(s))).to.be.true;
    });

    it('christian — includes latin -us suffix', () => {
      const results = svc.generate({ tradition: 'christian', count: 48 });
      const suffixes = new Set(results.map(r => r.suffix));
      expect([...suffixes]).to.include('-us');
    });

  });

  describe('domain filtering', () => {

    it('restricts results to the requested domain', () => {
      const results = svc.generate({ domain: 'war', count: 10 });
      for (const r of results) {
        expect(r.domain).to.equal('war');
      }
    });

    it('any domain — results span multiple domains', () => {
      const results = svc.generate({ domain: 'any', count: 30 });
      const domains = new Set(results.map(r => r.domain));
      expect(domains.size).to.be.greaterThan(1);
    });

  });

  describe('suffix filtering', () => {

    it('filters to only -el suffix', () => {
      const results = svc.generate({ suffixFilter: 'el', count: 10 });
      for (const r of results) {
        expect(r.suffix).to.equal('-el');
      }
    });

    it('filters to only -iel suffix', () => {
      const results = svc.generate({ suffixFilter: 'iel', count: 10 });
      for (const r of results) {
        expect(r.suffix).to.equal('-iel');
      }
    });

    it('filters to bare (none) suffix', () => {
      const results = svc.generate({ tradition: 'islamic', suffixFilter: 'none', count: 5 });
      for (const r of results) {
        expect(r.suffix).to.equal('none');
      }
    });

  });

  describe('suffix meanings', () => {

    it('every result has a non-empty suffixMeaning', () => {
      const results = svc.generate({ count: 20 });
      for (const r of results) {
        expect(r.suffixMeaning).to.be.a('string').and.not.be.empty;
      }
    });

    it('-el suffix meaning references God', () => {
      const results = svc.generate({ suffixFilter: 'el', count: 5 });
      for (const r of results) {
        expect(r.suffixMeaning.toLowerCase()).to.include('god');
      }
    });

  });

});
