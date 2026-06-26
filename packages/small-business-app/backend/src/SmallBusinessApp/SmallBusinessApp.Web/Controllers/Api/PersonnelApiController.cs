using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.HR;
using Pishgaman.SBA.Web.Data;

namespace Pishgaman.SBA.Web.Controllers.Api;

[ApiController]
[Route("api/v1/hr/personnel")]
public class PersonnelApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PersonnelApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.PersonnelProfiles.ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var profile = await _db.PersonnelProfiles.FindAsync(id);
        return profile is null ? NotFound() : Ok(profile);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PersonnelProfile profile)
    {
        profile.Id = Guid.NewGuid();
        _db.PersonnelProfiles.Add(profile);
        await _db.SaveChangesAsync();
        return Ok(profile);
    }
}

[ApiController]
[Route("api/v1/hr/contracts")]
public class ContractsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public ContractsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.EmploymentContracts.ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var contract = await _db.EmploymentContracts.FindAsync(id);
        return contract is null ? NotFound() : Ok(contract);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EmploymentContract contract)
    {
        contract.Id = Guid.NewGuid();
        _db.EmploymentContracts.Add(contract);
        await _db.SaveChangesAsync();
        return Ok(contract);
    }

    [HttpPost("{id}/amendments")]
    public async Task<IActionResult> CreateAmendment(Guid id, [FromBody] ContractAmendment amendment)
    {
        var contract = await _db.EmploymentContracts.FindAsync(id);
        if (contract is null) return NotFound();
        amendment.Id = Guid.NewGuid();
        amendment.EmploymentContractId = id;
        _db.ContractAmendments.Add(amendment);
        await _db.SaveChangesAsync();
        return Ok(amendment);
    }
}

[ApiController]
[Route("api/v1/hr/insurance")]
public class InsuranceApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public InsuranceApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.InsuranceProfiles.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] InsuranceProfile profile)
    {
        profile.Id = Guid.NewGuid();
        _db.InsuranceProfiles.Add(profile);
        await _db.SaveChangesAsync();
        return Ok(profile);
    }
}

[ApiController]
[Route("api/v1/hr/documents")]
public class DocumentsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public DocumentsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.PersonnelDocuments.ToListAsync());
}

[ApiController]
[Route("api/v1/hr/dependents")]
public class DependentsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public DependentsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Dependents.ToListAsync());
}