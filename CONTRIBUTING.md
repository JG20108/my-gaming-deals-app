# Contributing to Gaming Deals App

## Code Quality Standards

This project maintains high code quality standards through automated validation. All pull requests must pass the following checks:

### 🔍 Automated Checks

#### 1. TypeScript Validation

- **Type checking**: All TypeScript types must be valid
- **Unused variables**: No unused variables or imports allowed
- **Strict mode**: All strict TypeScript rules must pass

```bash
npm run type-check:strict
```

#### 2. ESLint Validation

- **Code style**: Consistent formatting and style
- **Best practices**: React hooks rules, security checks
- **No console.log**: Console statements not allowed in production code

```bash
npm run lint
```

#### 3. Build Validation

- **Successful build**: Code must compile without errors
- **Bundle size**: Monitor for unexpected size increases

```bash
npm run build
```

### 🚫 Prohibited Patterns

The following patterns will cause PR validation to fail:

1. **Console statements**: `console.log()`, `console.debug()` (use `console.warn()` or `console.error()` for legitimate cases)
2. **Unused imports**: Any imported module that isn't used
3. **Unused variables**: Variables declared but never referenced
4. **TypeScript errors**: Any compilation errors
5. **ESLint violations**: Code style or best practice violations

### 🛠️ Local Development

#### Pre-commit Hooks

Pre-commit hooks automatically run validation before each commit:

```bash
# Install husky (if not already installed)
npm install --save-dev husky
npx husky install

# Make pre-commit hook executable
chmod +x .husky/pre-commit
```

#### Manual Validation

Run all validation checks locally:

```bash
# Full validation suite
npm run validate

# Individual checks
npm run type-check:strict  # TypeScript with strict unused checks
npm run lint              # ESLint validation
npm run build            # Build validation
```

#### Fixing Issues

```bash
# Auto-fix ESLint issues
npm run lint:fix

# Check for specific issues
grep -r "console\.log" src/  # Find console.log statements
grep -r "TODO\|FIXME" src/   # Find TODO/FIXME comments
```

### 📋 PR Checklist

Before submitting a PR, ensure:

- [ ] All TypeScript types are correct
- [ ] No unused imports or variables
- [ ] No console.log statements in source code
- [ ] ESLint passes without warnings
- [ ] Build completes successfully
- [ ] Code follows established patterns
- [ ] Functions have proper JSDoc comments
- [ ] Components follow naming conventions (PascalCase)
- [ ] Utilities follow naming conventions (camelCase)

### 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/pr-validation.yml`) runs:

1. **Multi-Node Testing**: Tests on Node.js 18.x and 20.x
2. **TypeScript Validation**: Strict type checking
3. **ESLint Validation**: Code quality and style
4. **Build Testing**: Ensures code compiles
5. **Security Scanning**: Checks for vulnerabilities
6. **Code Pattern Validation**: Prevents problematic patterns

### 🐛 Common Issues & Solutions

#### "Unused variable" errors

```typescript
// ❌ Bad - unused import
import { SortDirection } from './types';

// ✅ Good - remove unused import
import { SortField } from './types';
```

#### "Console.log not allowed" errors

```typescript
// ❌ Bad - console.log in source
console.log('Debug info');

// ✅ Good - use for legitimate errors only
console.error('API request failed:', error);
```

#### TypeScript strict mode errors

```typescript
// ❌ Bad - unused parameter
const handleClick = (event: MouseEvent) => {
  doSomething();
};

// ✅ Good - prefix with underscore if truly unused
const handleClick = (_event: MouseEvent) => {
  doSomething();
};
```

### 🎯 Code Architecture

This project follows **SOLID principles** and **Domain-Driven Design**:

- **Single Responsibility**: Each function/component has one clear purpose
- **Open/Closed**: Extensible without modification
- **Clean Code**: Self-documenting, readable, maintainable
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized API calls and rendering

### 📞 Support

If you encounter validation issues:

1. Check the specific error messages in the CI logs
2. Run validation locally: `npm run validate`
3. Review this contributing guide
4. Check existing code patterns for examples

Remember: These validations exist to maintain code quality and prevent bugs in production! 🚀
